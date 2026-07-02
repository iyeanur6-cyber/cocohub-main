import { useNavigation, type NavigationProp } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { v4 as uuid } from 'uuid';

import { SkeletonCard } from '../components/SkeletonCard';
import { useTheme } from '../context/ThemeContext';
import type { CommunityPost, PostCategory } from '../models/CommunityPost';
import type { RootStackParamList } from '../navigation/types';
import { createPost, deletePost, getPosts, toggleLike } from '../services/communityService';

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterTab = 'all' | PostCategory;

const CATEGORIES: { key: PostCategory; label: string }[] = [
  { key: 'forum', label: '💬 Forum' },
  { key: 'tip', label: '💡 Tips' },
  { key: 'app', label: '📱 Apps' },
];

const EMPTY_FORM = { title: '', body: '', category: 'forum' as PostCategory };
// Stable session author ID so a user can only delete their own posts
const SESSION_AUTHOR_ID = uuid();
const SESSION_AUTHOR_NAME = 'You';

// ─── Component ────────────────────────────────────────────────────────────────

const CommunityScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const [filter, setFilter] = useState<FilterTab>('all');
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const load = useCallback(async () => {
    try {
      setError(null);
      const data = await getPosts();
      setPosts(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load posts.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const displayed = filter === 'all' ? posts : posts.filter((p) => p.category === filter);

  // ─── Create ─────────────────────────────────────────────────────────────────

  const handleCreate = async () => {
    if (!form.title.trim() || !form.body.trim()) {
      Alert.alert('Missing fields', 'Title and body are required.');
      return;
    }
    setPosting(true);
    try {
      await createPost({
        authorId: SESSION_AUTHOR_ID,
        authorName: SESSION_AUTHOR_NAME,
        category: form.category,
        title: form.title.trim(),
        body: form.body.trim(),
      });
      setForm(EMPTY_FORM);
      setModalVisible(false);
      await load();
    } catch (e) {
      Alert.alert('Error', e instanceof Error ? e.message : 'Failed to create post.');
    } finally {
      setPosting(false);
    }
  };

  // ─── Like ────────────────────────────────────────────────────────────────────

  const handleLike = async (postId: string) => {
    // Optimistic update
    setPosts((prev) => prev.map((p) => p.id === postId
      ? { ...p, likes: p.likedByMe ? p.likes - 1 : p.likes + 1, likedByMe: !p.likedByMe }
      : p));
    try {
      const updated = await toggleLike(postId);
      if (updated) setPosts((prev) => prev.map((p) => p.id === updated.id ? updated : p));
    } catch {
      await load(); // rollback on error
    }
  };

  // ─── Delete ──────────────────────────────────────────────────────────────────

  const handleDelete = (post: CommunityPost) => {
    if (post.authorId !== SESSION_AUTHOR_ID) return; // only own posts
    Alert.alert('Delete post', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: async () => {
          try {
            await deletePost(post.id);
            await load();
          } catch (e) {
            Alert.alert('Error', e instanceof Error ? e.message : 'Failed to delete.');
          }
        },
      },
    ]);
  };

  // ─── Render ──────────────────────────────────────────────────────────────────

  const renderPost = ({ item }: { item: CommunityPost }) => {
    const isOwn = item.authorId === SESSION_AUTHOR_ID;
    return (
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.cardHeader}>
          <Text style={[styles.categoryBadge, { color: colors.primary }]}>{categoryLabel(item.category)}</Text>
          <Text style={[styles.authorText, { color: colors.placeholder }]}>{item.authorName}</Text>
        </View>
        <Text style={[styles.postTitle, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.postBody, { color: colors.secondaryText }]} numberOfLines={4}>
          {item.body}
        </Text>
        <View style={styles.cardFooter}>
          <TouchableOpacity onPress={() => void handleLike(item.id)} style={styles.likeBtn}>
            <Text style={styles.likeBtnText}>{item.likedByMe ? '❤️' : '🤍'} {item.likes}</Text>
          </TouchableOpacity>
          {isOwn && (
            <TouchableOpacity onPress={() => handleDelete(item)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Nav shortcuts */}
      <View style={[styles.navRow, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity style={[styles.navBtn, { backgroundColor: colors.primaryMuted }]} onPress={() => navigation.navigate('Forum')}>
          <Text style={[styles.navBtnText, { color: colors.primary }]}>💬 Forum</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navBtn, { backgroundColor: colors.primaryMuted }]} onPress={() => navigation.navigate('LostFound')}>
          <Text style={[styles.navBtnText, { color: colors.primary }]}>🔍 Lost & Found</Text>
        </TouchableOpacity>
      </View>

      {/* Filter tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        style={[styles.filterRow, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}
        contentContainerStyle={styles.filterContent}
      >
        <TouchableOpacity
          style={[styles.filterTab, filter === 'all' && { backgroundColor: colors.primary }]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterTabText, { color: filter === 'all' ? '#fff' : colors.secondaryText }]}>All</Text>
        </TouchableOpacity>
        {CATEGORIES.map((c) => (
          <TouchableOpacity key={c.key}
            style={[styles.filterTab, filter === c.key && { backgroundColor: colors.primary }]}
            onPress={() => setFilter(c.key)}
          >
            <Text style={[styles.filterTabText, { color: filter === c.key ? '#fff' : colors.secondaryText }]}>{c.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Error banner */}
      {error && (
        <View style={[styles.errorBanner, { backgroundColor: '#fdecea' }]}>
          <Text style={{ color: '#c62828', fontSize: 13 }}>⚠️ {error}</Text>
          <TouchableOpacity onPress={() => void load()}><Text style={{ color: '#c62828', fontWeight: '700' }}> Retry</Text></TouchableOpacity>
        </View>
      )}

      {/* Loading skeletons */}
      {loading ? (
        <View style={{ padding: 16 }}>
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} height={110} />)}
        </View>
      ) : (
        <FlatList
          data={displayed}
          keyExtractor={(item) => item.id}
          renderItem={renderPost}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Text style={{ fontSize: 40, marginBottom: 12 }}>💬</Text>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>No posts yet</Text>
              <Text style={[styles.emptySubtitle, { color: colors.secondaryText }]}>Be the first to share something with the community!</Text>
              <TouchableOpacity style={[styles.emptyBtn, { backgroundColor: colors.primary }]} onPress={() => setModalVisible(true)}>
                <Text style={{ color: '#fff', fontWeight: '700' }}>Create first post</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}

      {/* FAB */}
      {!loading && (
        <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]} onPress={() => setModalVisible(true)}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}

      {/* Create post modal */}
      <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalVisible(false)}>
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>New Post</Text>
              <View style={styles.categoryRow}>
                {CATEGORIES.map((c) => (
                  <TouchableOpacity key={c.key}
                    style={[styles.categoryChip, form.category === c.key && { backgroundColor: colors.primary, borderColor: colors.primary }]}
                    onPress={() => setForm((f) => ({ ...f, category: c.key }))}
                  >
                    <Text style={[styles.categoryChipText, { color: form.category === c.key ? '#fff' : colors.secondaryText }]}>{c.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                style={[styles.input, { backgroundColor: colors.input, borderColor: colors.border, color: colors.text }]}
                placeholder="Title"
                placeholderTextColor={colors.placeholder}
                value={form.title}
                onChangeText={(v) => setForm((f) => ({ ...f, title: v }))}
              />
              <TextInput
                style={[styles.input, styles.textArea, { backgroundColor: colors.input, borderColor: colors.border, color: colors.text }]}
                placeholder="What's on your mind?"
                placeholderTextColor={colors.placeholder}
                value={form.body}
                onChangeText={(v) => setForm((f) => ({ ...f, body: v }))}
                multiline
                numberOfLines={4}
              />
              <View style={styles.modalActions}>
                <TouchableOpacity style={[styles.cancelBtn, { borderColor: colors.border }]}
                  onPress={() => { setForm(EMPTY_FORM); setModalVisible(false); }}>
                  <Text style={[styles.cancelBtnText, { color: colors.secondaryText }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.submitBtn, { backgroundColor: colors.primary }, posting && { opacity: 0.6 }]}
                  onPress={() => void handleCreate()}
                  disabled={posting}
                >
                  {posting
                    ? <ActivityIndicator color="#fff" size="small" />
                    : <Text style={styles.submitBtnText}>Post</Text>
                  }
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function categoryLabel(cat: PostCategory): string {
  switch (cat) {
    case 'forum': return '💬 Forum';
    case 'tip':   return '💡 Tip';
    case 'app':   return '📱 App';
  }
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1 },
  navRow: {
    flexDirection: 'row', gap: 10, padding: 12,
    borderBottomWidth: 1,
  },
  navBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center',
  },
  navBtnText: { fontWeight: '700', fontSize: 13 },
  filterRow: { maxHeight: 52, borderBottomWidth: 1 },
  filterContent: { paddingHorizontal: 12, paddingVertical: 8, gap: 8 },
  filterTab: {
    paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: 16, backgroundColor: 'transparent',
  },
  forumNavText: { color: '#fff', fontWeight: '700' },
  filterTabActive: { backgroundColor: '#4A90E2' },
  filterTabText: { fontSize: 13, color: '#555' },
  filterTabTextActive: { color: '#fff', fontWeight: '600' },
  listContent: { padding: 16, gap: 12 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  categoryBadge: { fontSize: 12, fontWeight: '600' },
  authorText: { fontSize: 12 },
  postTitle: { fontSize: 15, fontWeight: '700', marginBottom: 6 },
  postBody: { fontSize: 13, lineHeight: 18 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  likeBtn: { flexDirection: 'row', alignItems: 'center' },
  likeBtnText: { fontSize: 14 },
  deleteText: { fontSize: 12, color: '#e74c3c' },
  errorBanner: { flexDirection: 'row', alignItems: 'center', padding: 10, paddingHorizontal: 16 },
  emptyWrap: { alignItems: 'center', paddingTop: 60, paddingHorizontal: 32 },
  emptyTitle: { fontSize: 17, fontWeight: '700', marginBottom: 8 },
  emptySubtitle: { fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 20 },
  emptyBtn: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10 },
  fab: {
    position: 'absolute', bottom: 24, right: 24,
    width: 56, height: 56, borderRadius: 28,
    justifyContent: 'center', alignItems: 'center',
    elevation: 6, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 6,
  },
  fabText: { fontSize: 28, color: '#fff', lineHeight: 32 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 24 },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  categoryRow: { flexDirection: 'row', marginBottom: 16, gap: 8 },
  categoryChip: {
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16,
    borderWidth: 1, borderColor: 'transparent', backgroundColor: 'rgba(0,0,0,0.06)',
  },
  categoryChipText: { fontSize: 12, fontWeight: '600' },
  filterTabText: { fontSize: 13, fontWeight: '500' },
  input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 14, marginBottom: 12 },
  textArea: { height: 100, textAlignVertical: 'top' },
  modalActions: { flexDirection: 'row', marginTop: 4, gap: 10 },
  cancelBtn: { flex: 1, padding: 14, borderRadius: 8, borderWidth: 1, alignItems: 'center' },
  cancelBtnText: { fontWeight: '600' },
  submitBtn: { flex: 1, padding: 14, borderRadius: 8, alignItems: 'center' },
  submitBtnText: { color: '#fff', fontWeight: '700' },
  listContent: { padding: 16, gap: 12 },
});

export default CommunityScreen;
